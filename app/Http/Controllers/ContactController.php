<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

class ContactController extends Controller
{
    /**
     * Display the contact page.
     */
    public function index(): View
    {
        return view('charbel.contact');
    }

    /**
     * Handle contact form submission.
     */
    public function store(ContactRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // TODO: Implement contact form logic here
        // Examples:
        // - Send email notification
        // - Store in database
        // - Send to external service

        return back()->with('success', 'Message sent successfully!');
    }
}
