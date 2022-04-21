import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Promise } from 'q';

test('renders QQ号查询', () => {
  render(<App />);
  const title = screen.getByText(/QQ号查询/i);
  expect(title).toBeInTheDocument();
});

test('fetch loading', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('input-qq'), {target : {value: '222'}});
  
  expect(screen.getByTestId('input-qq')).not.toHaveAttribute('hidden')
});

test('fetch qqinfo successful', () => {
  window.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        code: 1,
        name: "妙音"
    })
  }));

  render(<App />);
  fireEvent.click(screen.getByTestId('input-qq'), {target : {value: '222'}});
  setTimeout(()=> {
    const name = screen.getByText(/妙音/)
    expect(name).toBeInTheDocument()
  },1000)
});

test('fetch qqinfo failed', () => {
  window.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        code: 10020,
        msg: '接口异常'
    })
  }));

  render(<App />);
  fireEvent.click(screen.getByTestId('input-qq'), {target : {value: '222'}});
  setTimeout(()=> {
    const error = screen.getByText(/接口异常/)
    expect(error).toBeInTheDocument()
  },1000)
});
