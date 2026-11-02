import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCosmic } from "@/context/CosmicContext";

const noiseChunk = `
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec2 mod289(vec2 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}
float fbm(vec2 p){
    float v = 0.0;
    float a = 0.55;
    for(int i = 0; i < 4; i++){
        v += a * snoise(p);
        p = p * 2.05 + vec2(13.7, 7.1);
        a *= 0.5;
    }
    return v;
}
`;

const auroraFragment = `
uniform float uTime;
uniform float uIntensity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec2 uRes;
varying vec2 vUv;
${noiseChunk}
void main(){
    vec2 uv = vUv;
    vec2 p = vec2(uv.x * 3.2, uv.y * 1.6);
    float t = uTime * 0.055;
    float flow = fbm(p + vec2(t * 1.4, -t * 0.6));
    float ribbon = fbm(p * 1.7 + vec2(-t * 0.9, flow * 1.6));
    float curtain = 1.0 - abs(uv.y - 0.52 + ribbon * 0.42);
    curtain = smoothstep(0.08, 0.92, curtain);
    float glow = pow(curtain, 1.8) * (0.55 + 0.45 * flow);
    vec3 col = mix(uColorA, uColorB, clamp(uv.x + ribbon * 0.5, 0.0, 1.0));
    col = mix(col, uColorC, clamp(flow * 0.9 + 0.25, 0.0, 1.0) * 0.55);
    float alpha = glow * uIntensity * smoothstep(0.0, 0.14, uv.y) * smoothstep(1.0, 0.7, uv.y) * 0.9;
    vec2 d = uv - 0.5;
    alpha *= 1.0 - dot(d, d) * 0.85;
    gl_FragColor = vec4(col * alpha, alpha);
}
`;

function AuroraVeil() {
    const { settingsRef } = useCosmic();
    const matRef = useRef();
    const { viewport } = useThree();
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uIntensity: { value: 1 },
            uColorA: { value: new THREE.Color("#8B5CF6") },
            uColorB: { value: new THREE.Color("#EC4899") },
            uColorC: { value: new THREE.Color("#06B6D4") },
            uRes: { value: new THREE.Vector2(1, 1) },
        }),
        [],
    );
    useFrame((state) => {
        const s = settingsRef.current;
        if (!matRef.current) return;
        const u = matRef.current.uniforms;
        u.uTime.value = state.clock.elapsedTime;
        u.uIntensity.value = s.intensity;
        u.uColorA.value.lerp(new THREE.Color(s.palette.a), 0.04);
        u.uColorB.value.lerp(new THREE.Color(s.palette.b), 0.04);
        u.uColorC.value.lerp(new THREE.Color(s.palette.c), 0.04);
    });
    return (
        <mesh position={[0, 1.4, -9]} scale={[viewport.width * 2.4, viewport.height * 2.4, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                ref={matRef}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
                fragmentShader={auroraFragment}
                uniforms={uniforms}
            />
        </mesh>
    );
}

function Starfield({ count = 2200 }) {
    const { settingsRef } = useCosmic();
    const ref = useRef();
    const matRef = useRef();
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 14 + Math.random() * 34;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
            arr[i * 3 + 2] = -Math.abs(r * Math.cos(phi)) - 3;
        }
        return arr;
    }, [count]);
    const scales = useMemo(() => {
        const arr = new Float32Array(count);
        for (let i = 0; i < count; i++) arr[i] = Math.random();
        return arr;
    }, [count]);

    useFrame((state) => {
        if (!ref.current || !matRef.current) return;
        ref.current.rotation.y = state.clock.elapsedTime * 0.008;
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, state.pointer.y * 0.08, 0.03);
        ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, state.pointer.x * 0.05, 0.03);
        matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        matRef.current.uniforms.uDensity.value = settingsRef.current.starDensity;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-aScale" count={count} array={scales} itemSize={1} />
            </bufferGeometry>
            <shaderMaterial
                ref={matRef}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                uniforms={{ uTime: { value: 0 }, uDensity: { value: 0.85 } }}
                vertexShader={`
                    attribute float aScale;
                    uniform float uTime;
                    varying float vAlpha;
                    void main(){
                        vec4 mv = modelViewMatrix * vec4(position, 1.0);
                        gl_Position = projectionMatrix * mv;
                        float tw = sin(uTime * (0.6 + aScale * 2.4) + aScale * 60.0) * 0.5 + 0.5;
                        vAlpha = 0.3 + tw * 0.7;
                        gl_PointSize = (1.1 + aScale * 2.6) * (160.0 / -mv.z);
                    }
                `}
                fragmentShader={`
                    uniform float uDensity;
                    varying float vAlpha;
                    void main(){
                        if(vAlpha < (1.0 - uDensity)) discard;
                        vec2 c = gl_PointCoord - 0.5;
                        float d = smoothstep(0.5, 0.05, length(c));
                        gl_FragColor = vec4(vec3(0.85, 0.92, 1.0) * d, d * vAlpha);
                    }
                `}
            />
        </points>
    );
}

function Meteors({ count = 70 }) {
    const { settingsRef, meteorLogRef } = useCosmic();
    const ref = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const color = useMemo(() => new THREE.Color("#22D3EE"), []);
    const streaks = useMemo(
        () =>
            Array.from({ length: count }, () => ({
                x: 0, y: -60, speed: 6 + Math.random() * 8, len: 0.5 + Math.random() * 1.3,
                active: false, nextSpawn: Math.random() * 6,
            })),
        [count],
    );
    const lastLog = useRef(0);

    useFrame((state, delta) => {
        if (!ref.current) return;
        const s = settingsRef.current;
        const t = state.clock.elapsedTime;
        color.lerp(new THREE.Color(s.palette.c), 0.05);
        for (let i = 0; i < count; i++) {
            const m = streaks[i];
            if (!m.active && t > m.nextSpawn) {
                m.active = true;
                m.x = 6 + Math.random() * 22;
                m.y = 8 + Math.random() * 10;
                m.speed = (5 + Math.random() * 9) * s.meteorSpeed;
                m.len = 0.5 + Math.random() * 1.4;
            }
            if (m.active) {
                m.x -= m.speed * delta;
                m.y -= m.speed * delta * 0.52;
                if (m.y < -14) {
                    m.active = false;
                    m.nextSpawn = t + Math.random() * 7 / Math.max(s.meteorSpeed, 0.05);
                    if (t - lastLog.current > 0.35) {
                        lastLog.current = t;
                        meteorLogRef.current = [
                            ...meteorLogRef.current.slice(-30),
                            { id: t + i, mag: (Math.random() * 2 + 0.4).toFixed(1), v: Math.round(m.speed * 11) },
                        ];
                    }
                }
            }
            const sc = m.active ? 1 : 0.0001;
            dummy.position.set(m.x, m.y, -6 - (i % 5));
            dummy.rotation.z = Math.atan2(0.52, 1);
            dummy.scale.set(m.len * sc, sc * 0.02 + 0.012, 1);
            dummy.updateMatrix();
            ref.current.setMatrixAt(i, dummy.matrix);
        }
        ref.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={ref} args={[null, null, count]} frustumCulled={false}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
        </instancedMesh>
    );
}

function CameraDrift() {
    const { camera } = useThree();
    useFrame((state) => {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.9, 0.035);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 0.55, 0.035);
        camera.lookAt(0, 0, -6);
    });
    return null;
}

const planetVertex = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormalV;
varying vec3 vPosV;
${noiseChunk}
void main(){
    vUv = uv;
    float n = fbm(uv * 6.0 + uTime * 0.015);
    vec3 pos = position + normal * n * 0.055;
    vNormalV = normalMatrix * normal;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vPosV = mv.xyz;
    gl_Position = projectionMatrix * mv;
}
`;

const planetFragment = `
uniform vec3 uColA;
uniform vec3 uColB;
uniform vec3 uColC;
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormalV;
varying vec3 vPosV;
${noiseChunk}
void main(){
    float bands = fbm(vec2(vUv.x * 7.0 + uTime * 0.01, vUv.y * 11.0));
    vec3 base = mix(uColA * 1.5 + vec3(0.05), uColB, smoothstep(-0.35, 0.55, bands));
    base = mix(base, uColC, smoothstep(0.25, 0.8, bands) * 0.75);
    vec3 viewDir = normalize(-vPosV);
    float fresnel = pow(1.0 - abs(dot(normalize(vNormalV), viewDir)), 2.0);
    vec3 rim = uColC * fresnel * 2.2;
    float shade = 0.55 + 0.45 * smoothstep(-0.9, 0.9, dot(normalize(vNormalV), normalize(vec3(0.7, 0.45, 0.6))));
    gl_FragColor = vec4(base * shade * 1.35 + rim, 1.0);
}
`;

export function CosmicPlanet({ position = [0, 0, 0], scale = 1.55, spin = 0.12 }) {
    const { settingsRef } = useCosmic();
    const matRef = useRef();
    const groupRef = useRef();
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColA: { value: new THREE.Color("#141B3D") },
            uColB: { value: new THREE.Color("#8B5CF6") },
            uColC: { value: new THREE.Color("#22D3EE") },
        }),
        [],
    );
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += spin * 0.016;
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.pointer.y * 0.15, 0.04);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -state.pointer.x * 0.1, 0.04);
        }
        if (matRef.current) {
            const s = settingsRef.current;
            matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            matRef.current.uniforms.uColB.value.lerp(new THREE.Color(s.palette.a), 0.04);
            matRef.current.uniforms.uColC.value.lerp(new THREE.Color(s.palette.c), 0.04);
        }
    });
    return (
        <group ref={groupRef} position={position} scale={scale}>
            <mesh>
                <sphereGeometry args={[1, 96, 96]} />
                <shaderMaterial ref={matRef} vertexShader={planetVertex} fragmentShader={planetFragment} uniforms={uniforms} />
            </mesh>
            <mesh rotation={[Math.PI / 2.25, 0.22, 0]}>
                <torusGeometry args={[1.55, 0.02, 12, 128]} />
                <meshBasicMaterial color="#67E8F9" transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh rotation={[Math.PI / 2.25, 0.22, 0]}>
                <torusGeometry args={[1.85, 0.008, 12, 128]} />
                <meshBasicMaterial color="#8B5CF6" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
        </group>
    );
}

function HeroPlanet() {
    return <CosmicPlanet position={[3.4, -0.6, -4.5]} scale={1.55} />;
}

export default function CosmicCanvas() {
    return (
        <div className="cosmic-canvas-wrap" data-testid="cosmic-canvas">
            <Canvas
                dpr={[1, 1.75]}
                camera={{ position: [0, 0, 6.5], fov: 55 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                <AuroraVeil />
                <Starfield />
                <Meteors />
                <HeroPlanet />
                <CameraDrift />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#03050C]" />
        </div>
    );
}
