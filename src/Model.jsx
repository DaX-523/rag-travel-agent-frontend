import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function Model({ isSpeaking }) {
  const { scene } = useGLTF("/assets/67f292005630b448a3d7176d.glb");
  const modelRef = useRef();

  // Store animation state
  const animationState = useRef({
    lastUpdate: 0,
    mouthValues: {},
  });

  // Log available morph targets when model loads
  useEffect(() => {
    try {
      scene.traverse((child) => {
        if (child.morphTargetDictionary) {
          console.log(
            "Available morph targets:",
            Object.keys(child.morphTargetDictionary)
          );
        }
      });
    } catch (error) {
      console.error("Error accessing model:", error);
    }
  }, [scene]);

  // Animate mouth using morph targets
  useFrame((state) => {
    if (isSpeaking) {
      scene.traverse((child) => {
        if (child.morphTargetInfluences && child.morphTargetDictionary) {
          // Get the time for animation - increased speed multiplier
          const time = state.clock.getElapsedTime() * 1.8;

          // Animate each morph target related to mouth movement
          Object.entries(child.morphTargetDictionary).forEach(
            ([key, index]) => {
              if (
                key.toLowerCase().includes("mouth") ||
                key.toLowerCase().includes("jaw") ||
                key.toLowerCase().includes("lips")
              ) {
                // Create a faster, more responsive mouth movement with higher frequencies
                const baseFreq = 6; // Higher base frequency (was 3)

                // Combine multiple sine waves with different frequencies for more natural movement
                const value =
                  Math.sin(time * baseFreq) * 0.6 + // Main movement (amplified)
                  Math.sin(time * baseFreq * 3) * 0.3 + // Faster overlay for details
                  Math.sin(time * baseFreq * 0.8) * 0.2; // Slower overlay for base movement

                // Add randomness for more natural variation (subtle jitter)
                const jitter = Math.random() * 0.05;

                // Quick response at speaking start
                const rampUpFactor = Math.min(
                  1,
                  (state.clock.getElapsedTime() -
                    animationState.current.lastUpdate) *
                    10
                );

                // Apply with quick interpolation to current value for smoother transitions
                const targetValue = Math.max(
                  0,
                  Math.min(1, value * 0.5 + 0.5 + jitter)
                );
                const currentValue = child.morphTargetInfluences[index] || 0;

                // Fast interpolation (80% of the way to target per frame)
                child.morphTargetInfluences[index] =
                  currentValue * 0.2 + targetValue * 0.8 * rampUpFactor;
              }
            }
          );
        }
      });

      // Update last speaking time
      animationState.current.lastUpdate = state.clock.getElapsedTime();
    } else {
      // Reset all morph targets when not speaking - faster reset
      scene.traverse((child) => {
        if (child.morphTargetInfluences) {
          // Gradually reset to zero for smoother transition when stopping
          for (let i = 0; i < child.morphTargetInfluences.length; i++) {
            if (child.morphTargetInfluences[i] > 0) {
              // Fast decay - 70% reduction per frame
              child.morphTargetInfluences[i] *= 0.3;
              // Cut off tiny values to ensure complete reset
              if (child.morphTargetInfluences[i] < 0.01) {
                child.morphTargetInfluences[i] = 0;
              }
            }
          }
        }
      });
    }
  });

  return (
    <group position={[0.0, -3.9, 0.0]} rotation={[0.4, 0.4, 0.0]}>
      <primitive object={scene} scale={2.4} ref={modelRef} />
    </group>
  );
}

export default Model;
