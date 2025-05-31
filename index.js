function to_millis(minutes) {
	return minutes * 60 * 1000;
}

function lesson(begin, end) {
	return {
		'begin': Date.parse(begin),
		'end': Date.parse(end),
	}
}

const LESSONS = [
	lesson("2025-06-02T09:50", "2025-06-02T10:55"),
	lesson("2025-06-02T12:05", "2025-06-02T12:55"),
	lesson("2025-06-02T13:05", "2025-06-02T15:25"),
	
	lesson("2025-06-03T09:10", "2025-06-03T10:35"),
	lesson("2025-06-03T10:50", "2025-06-03T11:40"),
	lesson("2025-06-03T14:50", "2025-06-03T16:20"),

	lesson("2025-06-05T08:20", "2025-06-05T09:35"),
	lesson("2025-06-05T09:35", "2025-06-05T11:00"),

	//

	lesson("2025-06-09T09:50", "2025-06-09T10:55"),
	lesson("2025-06-09T12:30", "2025-06-09T14:30"),
	lesson("2025-06-09T14:50", "2025-06-09T16:05"), // kanske ta bort

	lesson("2025-06-10T09:10", "2025-06-10T10:35"),
	lesson("2025-06-10T10:50", "2025-06-10T11:40"),
	lesson("2025-06-10T14:50", "2025-06-10T16:20"),

	lesson("2025-06-11T08:20", "2025-06-11T09:30"),
	lesson("2025-06-11T09:40", "2025-06-11T10:50"),
	lesson("2025-06-11T12:10", "2025-06-11T13:05"),
	lesson("2025-06-11T13:15", "2025-06-11T14:25"),
	lesson("2025-06-11T13:35", "2025-06-11T15:05"),
];

for (const lesson of LESSONS) {
	console.assert(lesson.end - lesson.begin <= 1000 * 3600 * 2 + 1000 * 60 * 20, lesson);
}

function time_left() {
	const now = Date.now();
	return LESSONS
		.filter(x => x.end >= now)
		.reduce((acc, curr) => acc += (curr.end - now) - Math.max(curr.begin - now, 0), 0);
}

const main_time_element = document.querySelector('.main_time');

function destructure_millis(millis) {
	const hours = Math.floor(millis / 1000 / 3600);
	millis -= hours * 1000 * 3600;
	const minutes = Math.floor(millis / 1000 / 60);
	millis -= minutes * 1000 * 60;
	const seconds = Math.floor(millis / 1000);
	millis -= seconds * 1000;
	return { hours, minutes, seconds };
}

function format_millis(millis) {
	const { hours, minutes, seconds } = destructure_millis(millis);
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

let YAY = false;

function frame() {
	const left = time_left();
	if (left < 1000 * 3600 * 5 && !YAY) {
		YAY = true;
		main_time_element.style.color = 'transparent';
		const audio = new Audio('rr.mp3');
		audio.loop = true;
		audio.play();
	}
	main_time_element.textContent = format_millis(left);
	requestAnimationFrame(frame);
}
requestAnimationFrame(frame);