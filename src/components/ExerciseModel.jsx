import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// A simple "Block Man" component constructed from primitives
const BlockMan = ({ exerciseType, isPaused }) => {
    const group = useRef();
    const leftArm = useRef();
    const rightArm = useRef();
    const leftLeg = useRef();
    const rightLeg = useRef();
    const body = useRef();
    const head = useRef();

    // Animation state
    const time = useRef(0);

    useFrame((state, delta) => {
        if (isPaused) return;

        time.current += delta * 3; // Speed of animation
        const t = time.current;

        // Reset poses
        if (group.current) {
            group.current.position.y = 0;
            group.current.rotation.x = 0;
            group.current.rotation.z = 0;
        }
        if (leftArm.current) leftArm.current.rotation.z = 0;
        if (rightArm.current) rightArm.current.rotation.z = 0;
        if (leftLeg.current) leftLeg.current.rotation.x = 0;
        if (rightLeg.current) rightLeg.current.rotation.x = 0;

        // Procedural Animations based on exercise type
        switch (exerciseType) {
            case 'jumping-jacks':
            case 'cardio':
                // Jumping Jacks Animation
                const jump = Math.sin(t * 2);
                if (group.current) group.current.position.y = Math.abs(jump) * 0.5;

                // Arms go up and down
                if (leftArm.current) leftArm.current.rotation.z = Math.PI - (jump > 0 ? 2.5 : 0.5); // Flapping
                if (rightArm.current) rightArm.current.rotation.z = -(Math.PI - (jump > 0 ? 2.5 : 0.5));

                // Legs spread
                if (leftLeg.current) leftLeg.current.rotation.z = jump > 0 ? 0.3 : 0;
                if (rightLeg.current) rightLeg.current.rotation.z = jump > 0 ? -0.3 : 0;
                break;

            case 'squats':
            case 'lunges':
            case 'strength':
                // Squat Animation
                const squat = (Math.sin(t) + 1) / 2; // 0 to 1
                if (group.current) group.current.position.y = -squat * 0.5;

                // Arms forward for balance
                if (leftArm.current) leftArm.current.rotation.x = -Math.PI / 2;
                if (rightArm.current) rightArm.current.rotation.x = -Math.PI / 2;

                // Legs "bend" (simulated by rotation for simple block model)
                if (leftLeg.current) leftLeg.current.rotation.x = -squat;
                if (rightLeg.current) rightLeg.current.rotation.x = -squat;
                break;

            case 'pushups':
            case 'plank':
            case 'core':
                // Pushup Animation
                if (group.current) {
                    group.current.rotation.x = -Math.PI / 2; // Lay flat
                    group.current.position.y = -0.8; // On floor
                }

                const push = (Math.sin(t) + 1) / 2;
                if (group.current) group.current.position.y = -0.8 + (exerciseType === 'plank' ? 0 : push * 0.3);

                // Arms support
                if (leftArm.current) leftArm.current.rotation.x = Math.PI / 2;
                if (rightArm.current) rightArm.current.rotation.x = Math.PI / 2;
                break;

            default:
                // Idle / Breathing
                const breath = Math.sin(t) * 0.05;
                if (group.current) group.current.position.y = breath;
        }
    });

    const material = new THREE.MeshStandardMaterial({ color: '#4ADE80' });
    const skinMaterial = new THREE.MeshStandardMaterial({ color: '#FFD1AA' });
    const shortsMaterial = new THREE.MeshStandardMaterial({ color: '#111827' });

    return (
        <group ref={group} dispose={null}>
            {/* Head */}
            <mesh ref={head} position={[0, 1.7, 0]} castShadow>
                <boxGeometry args={[0.25, 0.3, 0.25]} />
                <primitive object={skinMaterial} />
            </mesh>

            {/* Body */}
            <mesh ref={body} position={[0, 1.1, 0]} castShadow>
                <boxGeometry args={[0.4, 0.8, 0.2]} />
                <primitive object={material} />
            </mesh>

            {/* Left Arm */}
            <group position={[-0.3, 1.4, 0]}>
                <mesh ref={leftArm} position={[0, -0.35, 0]} castShadow>
                    <boxGeometry args={[0.12, 0.7, 0.12]} />
                    <primitive object={skinMaterial} />
                </mesh>
            </group>

            {/* Right Arm */}
            <group position={[0.3, 1.4, 0]}>
                <mesh ref={rightArm} position={[0, -0.35, 0]} castShadow>
                    <boxGeometry args={[0.12, 0.7, 0.12]} />
                    <primitive object={skinMaterial} />
                </mesh>
            </group>

            {/* Left Leg */}
            <group position={[-0.15, 0.7, 0]}>
                <mesh ref={leftLeg} position={[0, -0.35, 0]} castShadow>
                    <boxGeometry args={[0.15, 0.7, 0.15]} />
                    <primitive object={shortsMaterial} />
                </mesh>
            </group>

            {/* Right Leg */}
            <group position={[0.15, 0.7, 0]}>
                <mesh ref={rightLeg} position={[0, -0.35, 0]} castShadow>
                    <boxGeometry args={[0.15, 0.7, 0.15]} />
                    <primitive object={shortsMaterial} />
                </mesh>
            </group>
        </group>
    );
};

const ExerciseModel = ({ exerciseType, isPaused }) => {
    return (
        <div style={{ width: '100%', height: '300px', background: '#F8FAFC', borderRadius: '24px', overflow: 'hidden' }}>
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 1, 4]} fov={50} />
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <BlockMan exerciseType={exerciseType} isPaused={isPaused} />

                <ContactShadows resolution={1024} scale={10} blur={1} opacity={0.5} far={10} color="#000000" />
                <Environment preset="city" />
                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
            </Canvas>
        </div>
    );
};

export default ExerciseModel;
