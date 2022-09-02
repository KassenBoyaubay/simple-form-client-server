import { ChangeEventHandler } from 'react'

const themes = ['light', 'dark']

const setDark = () => {
    localStorage.setItem("theme", themes[1]);
    document.documentElement.setAttribute("data-theme", themes[1]);
};

const setLight = () => {
    localStorage.setItem("theme", themes[0]);
    document.documentElement.setAttribute("data-theme", themes[0]);
};

const storedTheme = localStorage.getItem("theme");

const prefersDark =
    window.matchMedia &&
    window.matchMedia(`(prefers-color-scheme: ${themes[1]})`).matches;

const defaultDark =
    storedTheme === themes[1] || (storedTheme === null && prefersDark);

if (defaultDark) {
    setDark();
}

const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
        setDark();
    } else {
        setLight();
    }
};

function Theme() {
    return (
        <div className="flex items-center gap-1 bg-base-100 px-1 py-1 rounded-md text-3xl">
            <span>☀️</span>
            <input type='checkbox' className='toggle toggle-lg bg-primary border-secondary border-2' defaultChecked={defaultDark} onChange={(e) => toggleTheme(e)}></input>
            <span>🌒</span>
        </div>
    )
}

export default Theme