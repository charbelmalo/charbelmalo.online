{{-- Availability Status Component --}}
@push('styles')
<style>
.pulsating-dot {
    border-radius: 100%;
    -webkit-animation: sploosh-pulse 2s cubic-bezier(0.165, 0.44, 0.44, 1);
    -webkit-animation-iteration-count: infinite;
}

.pulsating-dot:nth-child(2) {
    -webkit-animation-delay: .33s;
    -webkit-animation-duration: 2.2s;
}

@-webkit-keyframes sploosh-pulse {
    0% {
        box-shadow: 0 0 0 0px rgba(71, 225, 141, .7);
        background: rgba(71, 225, 141, .4);
    }
    80% {
        background: rgb(255, 255, 255);
    }
    100% {
        box-shadow: 0 0 0 5px rgba(66, 166, 223, 0);
    }
}
</style>
@endpush

<div class="elementor-element elementor-element-019558c elementor-widget elementor-widget-petextwrapper" data-id="019558c" data-element_type="widget" data-widget_type="petextwrapper.default">
    <div class="elementor-widget-container">
        <div class="text-wrapper">
            <p class="text-p no-margin">
                <span class="inner--icon elementor-repeater-item-3cdd920 pulsating-dot">
                    <i aria-hidden="true" class="material-icons-sharp md-fiber_manual_record" data-md-icon="fiber_manual_record"></i>
                </span> 
                Currently available for <a href="mailto:charbel.work@outlook.com" class="underlined">inquiries</a>.
            </p>
        </div>
    </div>
</div>
