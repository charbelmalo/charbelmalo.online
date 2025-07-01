/**
 * Advanced WebGL Shader Manager
 * Custom fragment and vertex shaders for unique visual effects
 */
class ShaderEffectsManager {
    constructor() {
        this.shaders = new Map();
        this.uniforms = new Map();
        this.materials = new Map();
        this.time = 0;
        
        this.initializeShaders();
    }

    initializeShaders() {
        // Holographic Shader
        this.shaders.set('holographic', {
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vPosition;
                varying vec3 vNormal;
                
                void main() {
                    vUv = uv;
                    vPosition = position;
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float opacity;
                uniform vec3 color;
                uniform float glowIntensity;
                
                varying vec2 vUv;
                varying vec3 vPosition;
                varying vec3 vNormal;
                
                void main() {
                    // Create holographic effect
                    float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
                    fresnel = 1.0 - fresnel;
                    fresnel = pow(fresnel, 2.0);
                    
                    // Animated scanning lines
                    float scan = sin(vUv.y * 50.0 + time * 2.0) * 0.5 + 0.5;
                    scan *= sin(vUv.x * 30.0 + time * 1.5) * 0.5 + 0.5;
                    
                    // Color shift based on position
                    vec3 holo = vec3(
                        sin(time + vPosition.x * 0.1) * 0.5 + 0.5,
                        sin(time + vPosition.y * 0.1 + 2.0) * 0.5 + 0.5,
                        sin(time + vPosition.z * 0.1 + 4.0) * 0.5 + 0.5
                    );
                    
                    // Combine effects
                    vec3 finalColor = mix(color, holo, 0.7) * fresnel * scan * glowIntensity;
                    
                    gl_FragColor = vec4(finalColor, opacity * fresnel);
                }
            `
        });

        // Digital Rain Shader (Matrix-style)
        this.shaders.set('digitalRain', {
            vertexShader: `
                varying vec2 vUv;
                
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec2 resolution;
                uniform float speed;
                uniform vec3 color;
                
                varying vec2 vUv;
                
                float random(vec2 st) {
                    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
                }
                
                void main() {
                    vec2 uv = vUv * resolution;
                    
                    // Create columns
                    float col = floor(uv.x);
                    float row = floor(uv.y);
                    
                    // Random offset for each column
                    float offset = random(vec2(col, 0.0)) * 100.0;
                    
                    // Moving rain effect
                    float rainPos = mod(time * speed + offset, resolution.y);
                    float dist = abs(row - rainPos);
                    
                    // Create trail effect
                    float trail = 1.0 / (1.0 + dist * 0.1);
                    trail *= step(row, rainPos);
                    
                    // Random character brightness
                    float charBrightness = random(vec2(col, floor(rainPos)));
                    
                    // Final color
                    vec3 finalColor = color * trail * charBrightness;
                    
                    gl_FragColor = vec4(finalColor, trail);
                }
            `
        });

        // Glitch Shader
        this.shaders.set('glitch', {
            vertexShader: `
                varying vec2 vUv;
                
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform sampler2D tDiffuse;
                uniform float glitchIntensity;
                uniform float noiseScale;
                
                varying vec2 vUv;
                
                float random(vec2 st) {
                    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
                }
                
                void main() {
                    vec2 uv = vUv;
                    
                    // Create glitch displacement
                    float noise = random(vec2(floor(uv.y * noiseScale), time));
                    float glitch = step(0.9, noise) * glitchIntensity;
                    
                    // Horizontal displacement
                    uv.x += glitch * (random(vec2(time, uv.y)) - 0.5) * 0.1;
                    
                    // Color separation
                    vec4 color;
                    color.r = texture2D(tDiffuse, uv + vec2(glitch * 0.01, 0.0)).r;
                    color.g = texture2D(tDiffuse, uv).g;
                    color.b = texture2D(tDiffuse, uv - vec2(glitch * 0.01, 0.0)).b;
                    color.a = 1.0;
                    
                    // Add scan lines
                    float scanline = sin(uv.y * 800.0) * 0.04;
                    color.rgb -= scanline;
                    
                    gl_FragColor = color;
                }
            `
        });

        // Energy Field Shader
        this.shaders.set('energyField', {
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vPosition;
                
                void main() {
                    vUv = uv;
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color1;
                uniform vec3 color2;
                uniform float intensity;
                uniform float speed;
                
                varying vec2 vUv;
                varying vec3 vPosition;
                
                void main() {
                    vec2 uv = vUv;
                    
                    // Create flowing energy patterns
                    float wave1 = sin(uv.x * 10.0 + time * speed) * sin(uv.y * 8.0 + time * speed * 0.7);
                    float wave2 = cos(uv.x * 12.0 - time * speed * 1.2) * cos(uv.y * 6.0 - time * speed * 0.8);
                    float wave3 = sin(length(uv - 0.5) * 20.0 - time * speed * 2.0);
                    
                    float energy = (wave1 + wave2 + wave3) * 0.33;
                    energy = abs(energy);
                    
                    // Color mixing
                    vec3 finalColor = mix(color1, color2, energy);
                    finalColor *= intensity;
                    
                    // Add glow effect
                    float glow = 1.0 - length(uv - 0.5) * 2.0;
                    glow = max(0.0, glow);
                    
                    gl_FragColor = vec4(finalColor, energy * glow);
                }
            `
        });
    }

    createMaterial(shaderName, uniforms = {}) {
        const shader = this.shaders.get(shaderName);
        if (!shader) {
            console.error(`Shader "${shaderName}" not found`);
            return null;
        }

        const defaultUniforms = {
            time: { value: 0 },
            opacity: { value: 1 },
            color: { value: new THREE.Color(0x00ffff) },
            ...uniforms
        };

        const material = new THREE.ShaderMaterial({
            uniforms: defaultUniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        this.materials.set(shaderName + '_' + Date.now(), material);
        return material;
    }

    updateUniforms(deltaTime) {
        this.time += deltaTime;
        
        this.materials.forEach(material => {
            if (material.uniforms.time) {
                material.uniforms.time.value = this.time;
            }
        });
    }

    // Portfolio-specific shader effects
    createPortfolioItemEffect(geometry, projectType) {
        let material;
        
        switch (projectType) {
            case 'grower':
                // Green energy field for AI/Agriculture
                material = this.createMaterial('energyField', {
                    color1: { value: new THREE.Color(0x00ff00) },
                    color2: { value: new THREE.Color(0x88ff88) },
                    intensity: { value: 1.5 },
                    speed: { value: 1.0 }
                });
                break;
                
            case 'hovi':
                // Blue holographic for hospitality tech
                material = this.createMaterial('holographic', {
                    color: { value: new THREE.Color(0x0088ff) },
                    glowIntensity: { value: 2.0 }
                });
                break;
                
            case 'pellini':
                // Warm coffee colors
                material = this.createMaterial('energyField', {
                    color1: { value: new THREE.Color(0x8B4513) },
                    color2: { value: new THREE.Color(0xFFD700) },
                    intensity: { value: 1.2 },
                    speed: { value: 0.5 }
                });
                break;
                
            case 'vertical-software':
                // Corporate tech glitch effect
                material = this.createMaterial('glitch', {
                    glitchIntensity: { value: 0.5 },
                    noiseScale: { value: 50.0 }
                });
                break;
                
            case 'nfe':
                // Digital rain for data processing
                material = this.createMaterial('digitalRain', {
                    resolution: { value: new THREE.Vector2(20, 30) },
                    speed: { value: 5.0 },
                    color: { value: new THREE.Color(0x00ff88) }
                });
                break;
                
            default:
                // Default holographic effect
                material = this.createMaterial('holographic');
        }
        
        return new THREE.Mesh(geometry, material);
    }

    dispose() {
        this.materials.forEach(material => {
            material.dispose();
        });
        this.materials.clear();
        this.shaders.clear();
        this.uniforms.clear();
    }
}

// Export for use in ThreeJS Portfolio Manager
window.ShaderEffectsManager = ShaderEffectsManager;
