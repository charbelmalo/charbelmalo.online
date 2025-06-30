{{-- Hero Section Component --}}
<section class="hero-section">
    <div class="elementor-element elementor-element-7271f59 e-con-full convert--none e-flex bg--none no e-con e-parent" data-id="7271f59" data-element_type="container">
        <div class="elementor-element elementor-element-e5cd129 e-con-full convert--none e-flex bg--none no e-con e-child" data-id="e5cd129" data-element_type="container">
            <div class="elementor-element elementor-element-41beb46 elementor-widget elementor-widget-petextwrapper" data-id="41beb46" data-element_type="widget" data-widget_type="petextwrapper.default">
                <div class="elementor-widget-container">
                    <div class="text-wrapper">
                        <h1 class="text-h1 no-margin" data-animate="true" data-animation="wordsUp" data-settings="{duration=1.5;delay=0;stagger=0.03;pin=false;pinTarget=;scrub=false;markers=false;start=0;startpov=top bottom;end=0;endpov=bottom bottom;out=false;inserted=true}">
                            <span class="underlined inner--element customized--word elementor-repeater-item-6d581bc">CHARBEL</span>
                            <span class="underlined inner--element customized--word elementor-repeater-item-fcb31cd">MALO</span>
                            <br> AI SOLUTIONS ENGINEER 
                            <span class="inner--icon elementor-repeater-item-53c90d8 me--slide-right" data-duration="1" data-delay="0">
                                <i aria-hidden="true" class="material-icons-sharp md-arrow_forward" data-md-icon="arrow_forward"></i>
                            </span> 
                            ARTIST <br> & FULL-STACK WIZARD.
                            <span class="inner--icon elementor-repeater-item-aa4f0d7 me--flip-y" data-duration="5" data-delay="0">
                                @include('component.sparkle-icon')
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
            
            <div class="elementor-element elementor-element-bd19887 elementor-widget elementor-widget-petextwrapper" data-id="bd19887" data-element_type="widget" data-widget_type="petextwrapper.default">
                <div class="elementor-widget-container">
                    <div class="text-wrapper">
                        <p class="text-p p-large no-margin"> 
                            Located in <span id="target-location">Beirut, Lebanon</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="elementor-element elementor-element-e3f2c8c e-con-full convert--none e-flex bg--none no e-con e-child" data-id="e3f2c8c" data-element_type="container">
            @include('component.cta-button')
            @include('component.availability-status')
            @include('component.avatar-video')
        </div>
    </div>
</section>
