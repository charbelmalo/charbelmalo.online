<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class PortfolioController extends Controller
{
    /**
     * Display the portfolio grower project.
     */
    public function grower(): View
    {
        return view('portfolio.grower');
    }

    /**
     * Display the portfolio hovi project.
     */
    public function hovi(): View
    {
        return view('portfolio.hovi');
    }
}
