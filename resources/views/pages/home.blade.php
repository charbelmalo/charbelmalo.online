@extends('layouts.app')

@section('content')
<article id="post-161" class="post-161 page type-page status-publish hentry normalize-width">
    <div class="entry-content">
        <div data-elementor-type="wp-page" data-elementor-id="161" class="elementor elementor-161" data-elementor-post-type="page">
            
            {{-- Hero Section --}}
            @include('component.hero-section')
            
            {{-- Main Content Sections --}}
            <div class="elementor-element elementor-element-fe10cea e-con-full convert--none e-flex bg--none no e-con e-parent" data-id="fe10cea" data-element_type="container" id="target_item">
                
                {{-- About Section --}}
                @include('component.about-section')
                
            </div>
            
            {{-- Portfolio Preview Section --}}
            @include('component.portfolio-preview')
            
            {{-- Marquee Section --}}
            @include('component.marquee-section')
            
            {{-- Skills Section --}}
            @include('component.skills-section')
            
            {{-- Why Choose Me Section --}}
            @include('component.why-choose-section')
            
            {{-- Call to Action Section --}}
            @include('component.cta-section')
            
        </div>
    </div>
</article>

@push('scripts')
<script src="{{ asset('js/three.js') }}" type="module"></script>
@endpush
@endsection
