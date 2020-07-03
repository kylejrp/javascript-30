const panels = document.querySelectorAll('.panel');
panels.forEach(panel =>
    panel.addEventListener('click', () => {
        if (panel.classList.contains('open')) {
            panel.classList.remove('open')
        } else {
            panels.forEach(panel => panel.classList.remove('open'))
            panel.classList.add('open');
        }
    }))