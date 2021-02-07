const createAutoComplete = ({
    root,
    renderOption,
    onOptionSelect,
    inputValue,
    fetchData
}) => {         // using arrow function.
    // creating HTML template on root section/division using inner html tag of Java script.
    root.innerHTML = `      
        <label><b>Search </b></label>
        <input class="input"/>
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
        `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const onInput = async(event) => {       // fetching data on entering input
        const items = await fetchData(event.target.value);
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for (let item of items) {       // to create drop down list(option list in dropdown).
            const option = document.createElement('a');

            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);

            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });
            resultsWrapper.appendChild(option);
        }
    };

    input.addEventListener('input', debounce(onInput, 500));    // calling debounce function to show options in dropdown after stop typing.

    document.addEventListener('click', event => {   // to inactive the options/dropdown after clicking on screen other than options(basically exiting).
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
};
