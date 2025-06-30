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

    /**
     * Display the portfolio pellini project.
     */
    public function pellini(): View
    {
        return view('portfolio.pellini');
    }

    /**
     * Display the portfolio vertical software project.
     */
    public function verticalSoftware(): View
    {
        return view('portfolio.vertical-software');
    }

    /**
     * Display the portfolio NFE project.
     */
    public function nfe(): View
    {
        return view('portfolio.nfe');
    }
}
