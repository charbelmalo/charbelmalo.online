/**
 * Advanced Three.js Portfolio Scene Manager
 * Handles dynamic 3D portfolio showcases with optimized performance
 */
class ThreeJSPortfolioManager {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.options = {
            enableBloom: true,
            enableParticles: true,
            enableInteraction: true,
            autoRotate: false,
            portfolioItems: [],
            ...options
        };

        // Three.js core components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        this.controls = null;

        // Portfolio-specific objects
        this.portfolioMeshes = [];
        this.particleSystem = null;
        this.currentProject = 0;
        this.isTransitioning = false;

        // Performance monitoring
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 60;

        // Animation state
        this.animationMixer = null;
        this.clock = new THREE.Clock();

        this.init();
    }

    async init() {
        if (!this.container) {
            console.error(`Container with ID "${this.containerId}" not found`);
            return;
        }

        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupComposer();
        this.setupControls();
        
        if (this.options.enableParticles) {
            this.createParticleSystem();
        }

        await this.loadPortfolioAssets();
        this.setupEventListeners();
        this.startRenderLoop();

        // Progressive enhancement
        this.optimizeForDevice();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        
        // Dynamic background based on time of day
        const now = new Date();
        const hour = now.getHours();
        let backgroundColor, fogColor;

        if (hour >= 6 && hour < 18) {
            // Daytime
            backgroundColor = 0xF0F8FF;
            fogColor = 0xE6E6FA;
        } else {
            // Nighttime
            backgroundColor = 0x191970;
            fogColor = 0x2F2F4F;
        }

        this.scene.background = new THREE.Color(backgroundColor);
        this.scene.fog = new THREE.Fog(fogColor, 10, 100);

        // Ambient lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Directional light with shadows
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point light for dramatic effect
        const pointLight = new THREE.PointLight(0x007bff, 0.8, 50);
        pointLight.position.set(0, 5, 0);
        this.scene.add(pointLight);
    }

    setupCamera() {
        const aspectRatio = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
        this.camera.position.set(-2.8, -0.4, 2.8);
        this.camera.rotation.set(0.155, -0.869, 0.119);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        
        this.container.appendChild(this.renderer.domElement);
    }

    setupComposer() {
        if (!this.options.enableBloom) return;

        this.composer = new EffectComposer(this.renderer);
        
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.container.clientWidth, this.container.clientHeight),
            0.5, // strength
            0.4, // radius
            0.85 // threshold
        );
        this.composer.addPass(bloomPass);

        // Anti-aliasing for better quality
        const smaaPass = new SMAAPass(
            this.container.clientWidth * this.renderer.getPixelRatio(),
            this.container.clientHeight * this.renderer.getPixelRatio()
        );
        this.composer.addPass(smaaPass);
    }

    setupControls() {
        if (!this.options.enableInteraction) return;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = this.options.autoRotate;
        this.controls.autoRotateSpeed = 0.5;
        this.controls.maxDistance = 10;
        this.controls.minDistance = 2;
    }

    createParticleSystem() {
        const particleCount = 1000;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions in sphere
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;

            // Random colors
            colors[i3] = Math.random();
            colors[i3 + 1] = Math.random();
            colors[i3 + 2] = Math.random();

            // Random sizes
            sizes[i] = Math.random() * 2 + 1;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
            },
            vertexShader: `
                uniform float time;
                uniform float pixelRatio;
                attribute float size;
                varying vec3 vColor;

                void main() {
                    vColor = color;
                    
                    vec3 pos = position;
                    pos.y += sin(time + position.x * 0.01) * 0.5;
                    pos.x += cos(time + position.y * 0.01) * 0.5;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;

                void main() {
                    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                    float strength = 0.05 / distanceToCenter - 0.1;
                    
                    gl_FragColor = vec4(vColor, strength);
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });

        this.particleSystem = new THREE.Points(particles, particleMaterial);
        this.scene.add(this.particleSystem);
    }

    async loadPortfolioAssets() {
        const loader = new GLTFLoader();
        
        for (let i = 0; i < this.options.portfolioItems.length; i++) {
            const item = this.options.portfolioItems[i];
            
            try {
                // Create placeholder geometry if no 3D model is available
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshPhongMaterial({
                    color: new THREE.Color().setHSL(i / this.options.portfolioItems.length, 0.7, 0.6),
                    transparent: true,
                    opacity: 0.8
                });
                
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = i * 3 - (this.options.portfolioItems.length - 1) * 1.5;
                mesh.userData = item;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                
                this.portfolioMeshes.push(mesh);
                this.scene.add(mesh);
                
                // Add interactive hover effects
                this.addInteractiveEffects(mesh, i);
                
            } catch (error) {
                console.warn(`Failed to load 3D asset for ${item.title}:`, error);
            }
        }
    }

    addInteractiveEffects(mesh, index) {
        const originalPosition = mesh.position.clone();
        const originalScale = mesh.scale.clone();
        
        mesh.userData.originalPosition = originalPosition;
        mesh.userData.originalScale = originalScale;
        mesh.userData.isHovered = false;
        
        // Floating animation
        mesh.userData.floatOffset = Math.random() * Math.PI * 2;
    }

    setupEventListeners() {
        // Resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Mouse interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, this.camera);
            const intersects = raycaster.intersectObjects(this.portfolioMeshes);
            
            // Reset all meshes
            this.portfolioMeshes.forEach(mesh => {
                mesh.userData.isHovered = false;
            });
            
            // Highlight hovered mesh
            if (intersects.length > 0) {
                intersects[0].object.userData.isHovered = true;
                this.container.style.cursor = 'pointer';
            } else {
                this.container.style.cursor = 'default';
            }
        });
        
        this.container.addEventListener('click', (event) => {
            const rect = this.container.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, this.camera);
            const intersects = raycaster.intersectObjects(this.portfolioMeshes);
            
            if (intersects.length > 0) {
                const mesh = intersects[0].object;
                this.navigateToProject(mesh.userData);
            }
        });
    }

    navigateToProject(projectData) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Trigger page transition
        document.body.classList.add('portfolio-transitioning');
        
        setTimeout(() => {
            if (projectData.url) {
                window.location.href = projectData.url;
            }
        }, 600);
    }

    handleResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
        
        if (this.composer) {
            this.composer.setSize(width, height);
        }
    }

    optimizeForDevice() {
        // Reduce quality on mobile devices
        if (window.innerWidth < 768) {
            this.renderer.setPixelRatio(1);
            
            if (this.particleSystem) {
                this.particleSystem.visible = false;
            }
            
            if (this.composer) {
                // Disable bloom on mobile for better performance
                this.options.enableBloom = false;
            }
        }
        
        // Monitor performance and adjust quality
        this.performanceMonitor();
    }

    performanceMonitor() {
        setInterval(() => {
            if (this.fps < 30) {
                // Reduce quality if FPS drops
                this.renderer.setPixelRatio(Math.max(1, this.renderer.getPixelRatio() - 0.1));
                
                if (this.particleSystem && this.particleSystem.visible) {
                    this.particleSystem.visible = false;
                }
            }
        }, 5000);
    }

    startRenderLoop() {
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Performance monitoring
            const currentTime = performance.now();
            this.frameCount++;
            
            if (currentTime - this.lastTime >= 1000) {
                this.fps = this.frameCount;
                this.frameCount = 0;
                this.lastTime = currentTime;
            }
            
            this.update();
            this.render();
        };
        
        animate();
    }

    update() {
        const elapsedTime = this.clock.getElapsedTime();
        
        // Update controls
        if (this.controls) {
            this.controls.update();
        }
        
        // Update particle system
        if (this.particleSystem) {
            this.particleSystem.material.uniforms.time.value = elapsedTime;
            this.particleSystem.rotation.y = elapsedTime * 0.1;
        }
        
        // Update portfolio meshes
        this.portfolioMeshes.forEach((mesh, index) => {
            // Floating animation
            const floatOffset = mesh.userData.floatOffset || 0;
            mesh.position.y = mesh.userData.originalPosition.y + Math.sin(elapsedTime + floatOffset) * 0.2;
            
            // Hover effects
            if (mesh.userData.isHovered) {
                mesh.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
                mesh.rotation.y += 0.02;
            } else {
                mesh.scale.lerp(mesh.userData.originalScale, 0.1);
                mesh.rotation.y = elapsedTime * 0.5;
            }
        });
    }

    render() {
        if (this.composer && this.options.enableBloom) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }

    destroy() {
        // Clean up resources
        if (this.controls) {
            this.controls.dispose();
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        if (this.composer) {
            this.composer.dispose();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize.bind(this));
        
        // Clear the container
        if (this.container && this.renderer) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}

// Export for use in other modules
window.ThreeJSPortfolioManager = ThreeJSPortfolioManager;
