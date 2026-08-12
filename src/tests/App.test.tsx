/// <reference types="vitest/globals" />
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import App from '../App';
describe('App component', () => {
    it('renders heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 }))
        .toHaveTextContent('Список пользователей');
    });
    it('adds a user on form submit', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('enter name...'), {
        target: { value: 'Анна' },
    });
    fireEvent.change(screen.getByPlaceholderText('enter lastname...'), {
        target: { value: 'Иванова' },
    });
    fireEvent.change(screen.getByPlaceholderText('enter age...'), {
        target: { value: '25' },
    });
    fireEvent.change(screen.getByPlaceholderText('enter hobby...'), {
        target: { value: 'Книги' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    // проверяем, что пользователь появился в списке
    expect(screen.getByText('Анна Иванова')).toBeInTheDocument();
    });
  // ---- additional tests ----
    it('deletes a user', () => {
    render(<App />);
    // add a user first
    fireEvent.change(screen.getByPlaceholderText('enter name...'), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByPlaceholderText('enter lastname...'), { target: { value: 'Builder' } });
    fireEvent.change(screen.getByPlaceholderText('enter age...'), { target: { value: '30' } });
    fireEvent.change(screen.getByPlaceholderText('enter hobby...'), { target: { value: 'Construction' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    // now delete
    const delBtn = screen.getAllByRole('button').find(btn => btn.classList.contains('btn__danger'));
    if (delBtn) {
        fireEvent.click(delBtn);
    }
    expect(screen.queryByText('Bob Builder')).toBeNull();
    });

    it('toggles user happy state', () => {
    render(<App />);
    // add a user
    fireEvent.change(screen.getByPlaceholderText('enter name...'), { target: { value: 'Cara' } });
    fireEvent.change(screen.getByPlaceholderText('enter lastname...'), { target: { value: 'Smile' } });
    fireEvent.change(screen.getByPlaceholderText('enter age...'), { target: { value: '22' } });
    fireEvent.change(screen.getByPlaceholderText('enter hobby...'), { target: { value: 'Music' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    // toggle happy (edit) button
    const editBtn = screen.getAllByRole('button').find(btn => btn.classList.contains('btn__success'));
    if (editBtn) {
        fireEvent.click(editBtn);
    }
    const userSpan = screen.getByText('Cara Smile');
    expect(userSpan).toHaveClass('text--done');
    });
});