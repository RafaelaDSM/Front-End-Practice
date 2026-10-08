// MENU MOBILE
const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('.main-menu');

if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mainMenu.classList.toggle('open');
    
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Fechar menu' : 'Abrir menu'
        );
    });
}

// Dropdown Product
const productDropdownPanel = document.querySelector('#product-dropdown');
const productDropdownItem = productDropdownPanel?.closest('.nav-dropdown');
const productDropdownButton = productDropdownItem?.querySelector(':scope > button');
const workflowHighlight = productDropdownPanel?.querySelector('.workflow-highlight');
const workflowResources = productDropdownPanel?.querySelector('.workflow-resources');
const templatesDropdownPanel = document.querySelector('#templates-dropdown');
const templatesDropdownItem = templatesDropdownPanel?.closest('.nav-dropdown');
const templatesDropdownButton = templatesDropdownItem?.querySelector(':scope > button');

if (productDropdownItem && productDropdownButton) {
    let dropdownCloseTimer;

    const closeProductDropdown = () => {
        productDropdownItem.classList.remove('is-open');
        productDropdownPanel.classList.remove('workflow-active');
        productDropdownButton.setAttribute('aria-expanded', 'false');
    };

    const cancelScheduledClose = () => {
        window.clearTimeout(dropdownCloseTimer);
    };

    const scheduleClose = () => {
        cancelScheduledClose();
        dropdownCloseTimer = window.setTimeout(() => {
            if (!productDropdownItem.matches(':hover')) {
                closeProductDropdown();
            }
        }, 220);
    };

    const openProductDropdown = () => {
        productDropdownItem.classList.add('is-open');
        productDropdownButton.setAttribute('aria-expanded', 'true');
    };

    if (workflowHighlight && workflowResources) {
        let workflowCloseTimer;
        const workflowAreas = [workflowHighlight, workflowResources];

        const cancelWorkflowClose = () => {
            window.clearTimeout(workflowCloseTimer);
        };

        const activateWorkflow = () => {
            cancelWorkflowClose();
            productDropdownPanel.classList.add('workflow-active');
        };

        const scheduleWorkflowClose = () => {
            cancelWorkflowClose();
            workflowCloseTimer = window.setTimeout(() => {
                const pointerIsInside = workflowAreas.some((area) => area.matches(':hover'));
                const focusIsInside = workflowAreas.some((area) => area.contains(document.activeElement));

                if (!pointerIsInside && !focusIsInside) {
                    productDropdownPanel.classList.remove('workflow-active');
                }
            }, 120);
        };

        workflowAreas.forEach((area) => {
            area.addEventListener('pointerenter', (event) => {
                if (event.pointerType === 'mouse') {
                    activateWorkflow();
                }
            });

            area.addEventListener('pointerleave', (event) => {
                if (event.pointerType === 'mouse') {
                    scheduleWorkflowClose();
                }
            });

            area.addEventListener('focusin', activateWorkflow);

            area.addEventListener('focusout', (event) => {
                const nextFocusIsInside = workflowAreas.some((element) => element.contains(event.relatedTarget));

                if (!nextFocusIsInside) {
                    scheduleWorkflowClose();
                }
            });
        });
    }

    productDropdownItem.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'mouse') {
            cancelScheduledClose();
            openProductDropdown();
        }
    });

    productDropdownItem.addEventListener('pointerleave', (event) => {
        if (event.pointerType === 'mouse') {
            scheduleClose();
        }
    });

    productDropdownPanel.addEventListener('pointerenter', cancelScheduledClose);

    productDropdownItem.addEventListener('focusin', openProductDropdown);

    productDropdownItem.addEventListener('focusout', (event) => {
        if (!productDropdownItem.contains(event.relatedTarget)) {
            closeProductDropdown();
        }
    });

    productDropdownButton.addEventListener('click', (event) => {
        // Hover controla o desktop; o clique fica para toque e ativação por teclado.
        if (event.detail > 0 && window.matchMedia('(hover: hover)').matches) {
            return;
        }

        const isOpen = productDropdownItem.classList.toggle('is-open');
        productDropdownButton.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
        if (!productDropdownItem.contains(event.target)) {
            closeProductDropdown();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && productDropdownItem.classList.contains('is-open')) {
            closeProductDropdown();
            productDropdownButton.focus();
        }
    });
}

// Dropdown Templates
if (templatesDropdownItem && templatesDropdownButton) {
    let templatesCloseTimer;

    const closeTemplatesDropdown = () => {
        templatesDropdownItem.classList.remove('is-open');
        templatesDropdownButton.setAttribute('aria-expanded', 'false');
    };

    const openTemplatesDropdown = () => {
        window.clearTimeout(templatesCloseTimer);
        templatesDropdownItem.classList.add('is-open');
        templatesDropdownButton.setAttribute('aria-expanded', 'true');
    };

    const scheduleTemplatesClose = () => {
        window.clearTimeout(templatesCloseTimer);
        templatesCloseTimer = window.setTimeout(() => {
            if (!templatesDropdownItem.matches(':hover')) {
                closeTemplatesDropdown();
            }
        }, 220);
    };

    templatesDropdownItem.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'mouse') {
            openTemplatesDropdown();
        }
    });

    templatesDropdownItem.addEventListener('pointerleave', (event) => {
        if (event.pointerType === 'mouse') {
            scheduleTemplatesClose();
        }
    });

    templatesDropdownItem.addEventListener('focusin', openTemplatesDropdown);

    templatesDropdownItem.addEventListener('focusout', (event) => {
        if (!templatesDropdownItem.contains(event.relatedTarget)) {
            closeTemplatesDropdown();
        }
    });

    templatesDropdownButton.addEventListener('click', (event) => {
        if (event.detail > 0 && window.matchMedia('(hover: hover)').matches) {
            return;
        }

        const isOpen = templatesDropdownItem.classList.toggle('is-open');
        templatesDropdownButton.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
        if (!templatesDropdownItem.contains(event.target)) {
            closeTemplatesDropdown();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && templatesDropdownItem.classList.contains('is-open')) {
            closeTemplatesDropdown();
            templatesDropdownButton.focus();
        }
    });
}

// FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
    const button = item.querySelector('button');
    const answer = item.querySelector('p');

    button.addEventListener('click', () => {
        answer.classList.toggle('open');
    });
});
