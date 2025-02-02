<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('homepage');
})->name('home');
Route::get('/portfolio/grower', function () {
    return view('portfolio.grower');
})->name('portfolio.grower');

Route::get('/contact', function () {
    return view('charbel.contact');
})->name('contact');
