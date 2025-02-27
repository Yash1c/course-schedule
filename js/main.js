document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather icons
    feather.replace();

    // Elements
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const scheduleContainer = document.getElementById('schedule-container');
    const scheduleList = document.getElementById('schedule-list');
    const eventCount = document.getElementById('event-count');

    // Load schedule data
    loadSchedule();

    async function loadSchedule() {
        try {
            const response = await fetch('data/schedule.json');
            if (!response.ok) {
                throw new Error('Failed to load schedule data');
            }

            const data = await response.json();
            console.log('Loaded schedule data:', data); // Debug log

            if (!data.events || !Array.isArray(data.events)) {
                throw new Error('Invalid schedule data format');
            }

            displaySchedule(data.events);
        } catch (error) {
            console.error('Schedule loading error:', error); // Debug log
            showError(error.message);
        }
    }

    function displaySchedule(events) {
        // Clear existing events
        scheduleList.innerHTML = '';

        // Sort events by date
        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Update event count
        eventCount.textContent = `${events.length} events scheduled`;

        // Create event elements
        events.forEach(event => {
            const eventElement = createEventElement(event);
            scheduleList.appendChild(eventElement);
        });

        // Hide loading, show content
        loadingElement.classList.add('d-none');
        scheduleContainer.classList.remove('d-none');
    }

    function createEventElement(event) {
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item';

        const date = new Date(event.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        listItem.innerHTML = `
            <div class="d-flex flex-column flex-md-row align-items-md-center">
                <div class="event-date fw-bold">${formattedDate}</div>
                <div class="event-time">${event.time}</div>
                <div class="flex-grow-1">
                    <div class="fw-bold">${event.title}</div>
                    <div class="event-description">${event.description}</div>
                </div>
            </div>
        `;

        return listItem;
    }

    function showError(message) {
        loadingElement.classList.add('d-none');
        errorElement.classList.remove('d-none');
        document.getElementById('error-message').textContent = message;
    }
});