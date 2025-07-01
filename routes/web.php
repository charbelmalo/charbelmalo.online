<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ContactController;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Portfolio routes with route model binding
Route::prefix('portfolio')->name('portfolio.')->group(function () {
    Route::get('/', [PortfolioController::class, 'index'])->name('index');
    
    // Specific named routes for existing portfolio items
    Route::get('/grower', function() { 
        return app(App\Http\Controllers\PortfolioController::class)->show(request(), 'grower'); 
    })->name('grower');
    
    Route::get('/hovi', function() { 
        return app(App\Http\Controllers\PortfolioController::class)->show(request(), 'hovi'); 
    })->name('hovi');
    
    Route::get('/pellini', function() { 
        return app(App\Http\Controllers\PortfolioController::class)->show(request(), 'pellini'); 
    })->name('pellini');
    
    Route::get('/vertical-software', function() { 
        return app(App\Http\Controllers\PortfolioController::class)->show(request(), 'vertical-software'); 
    })->name('vertical-software');
    
    Route::get('/nfe', function() { 
        return app(App\Http\Controllers\PortfolioController::class)->show(request(), 'nfe'); 
    })->name('nfe');
    
    // Generic route for any other portfolio items
    Route::get('/{project}', [PortfolioController::class, 'show'])->name('show');
});

// API routes
Route::prefix('api/portfolio')->name('api.portfolio.')->group(function () {
    Route::get('/', [PortfolioController::class, 'apiIndex'])->name('index');
    Route::get('/featured', [PortfolioController::class, 'apiFeatured'])->name('featured');
    Route::get('/{project}/navigation', [PortfolioController::class, 'getNavigation'])->name('navigation');
});

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
