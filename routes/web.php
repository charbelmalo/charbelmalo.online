<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ContactController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::prefix('portfolio')->name('portfolio.')->group(function () {
    Route::get('/grower', [PortfolioController::class, 'grower'])->name('grower');
    Route::get('/hovi', [PortfolioController::class, 'hovi'])->name('hovi');
    Route::get('/pellini', [PortfolioController::class, 'pellini'])->name('pellini');
    Route::get('/vertical-software', [PortfolioController::class, 'verticalSoftware'])->name('vertical-software');
    Route::get('/nfe', [PortfolioController::class, 'nfe'])->name('nfe');
});

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
