/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import App from '../App';

describe('App component', () => {
  // Render a fresh instance before each test
    beforeEach(() => {
    render(<App />);
    });

    afterEach(() => {
    // Cleanup is performed automatically by @testing-library/react in recent versions,
    // but we keep this hook for explicitness and future extensions.
    });

    it('renders heading', () => {
    // Use role and level for accessible heading query
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Список пользователей');
    });

    it('adds a user on form submit', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('enter name...'), 'Анна');
    await user.type(screen.getByPlaceholderText('enter lastname...'), 'Иванова');
    await user.type(screen.getByPlaceholderText('enter age...'), '25');
    await user.type(screen.getByPlaceholderText('enter bio...'), 'Пицца');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Verify that the newly added user appears in the list
    expect(screen.getByText('Анна Иванова')).toBeInTheDocument();
    });

    it('deletes a user', async () => {
    const user = userEvent.setup();
    // Add a user first
    await user.type(screen.getByPlaceholderText('enter name...'), 'Bob');
    await user.type(screen.getByPlaceholderText('enter lastname...'), 'Builder');
    await user.type(screen.getByPlaceholderText('enter age...'), '30');
    await user.type(screen.getByPlaceholderText('enter bio...'), 'Construction');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Find the delete button via its accessible name or aria-label. Fallback to class selector if necessary.
    const deleteBtn = screen.getAllByRole('button').find((btn) => btn.classList.contains('btn__danger'));
    if (deleteBtn) {
        await user.click(deleteBtn);
    }
    // Ensure the user is removed from the DOM
    expect(screen.queryByText('Bob Builder')).not.toBeInTheDocument();
    });

    it('toggles user happy state', async () => {
    const user = userEvent.setup();
    // Add a user
    await user.type(screen.getByPlaceholderText('enter name...'), 'Cara');
    await user.type(screen.getByPlaceholderText('enter lastname...'), 'Smile');
    await user.type(screen.getByPlaceholderText('enter age...'), '22');
    await user.type(screen.getByPlaceholderText('enter bio...'), 'Music');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Find the edit/toggle button (success style) and click it
    const editBtn = screen.getAllByRole('button').find((btn) => btn.classList.contains('btn__success'));
    if (editBtn) {
        await user.click(editBtn);
    }
    const userSpan = screen.getByText('Cara Smile');
    expect(userSpan).toHaveClass('text--done');
    });
});