<script lang="ts">
	import { page } from '$app/state';

	const routeMap: Record<string, string> = {
		'/lyrics': 'lyrics',
		'/settings': 'settings',
		'/sync': 'sync',
		'/help': 'help',
		'/visualizer': 'visualizer'
	};

	const activeIcon = $derived(routeMap[page.route.id ?? ''] ?? '');
</script>

<nav>
	<a href="/lyrics" title="Lyric Editor" class:selected={activeIcon == 'lyrics'}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
			<path
				d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z"
			/>
		</svg>
	</a>
	<a href="/sync" title="Sync Lyrics" class:selected={activeIcon == 'sync'}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
			<path
				d="M384 128C384 145.7 369.7 160 352 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L352 96C369.7 96 384 110.3 384 128zM384 384C384 401.7 369.7 416 352 416L128 416C110.3 416 96 401.7 96 384C96 366.3 110.3 352 128 352L352 352C369.7 352 384 366.3 384 384zM96 256C96 238.3 110.3 224 128 224L512 224C529.7 224 544 238.3 544 256C544 273.7 529.7 288 512 288L128 288C110.3 288 96 273.7 96 256zM544 512C544 529.7 529.7 544 512 544L128 544C110.3 544 96 529.7 96 512C96 494.3 110.3 480 128 480L512 480C529.7 480 544 494.3 544 512z"
			/>
		</svg>
	</a>
	<a href="/visualizer" title="Visualizer" class:selected={activeIcon == 'visualizer'}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
			><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
				d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"
			/></svg
		>
	</a>
	<a href="/help" title="Getting Started" class:selected={activeIcon == 'help'}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
			><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
				d="M224 224C224 171 267 128 320 128C373 128 416 171 416 224C416 266.7 388.1 302.9 349.5 315.4C321.1 324.6 288 350.7 288 392L288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416L352 392C352 390.3 352.6 387.9 355.5 384.7C358.5 381.4 363.4 378.2 369.2 376.3C433.5 355.6 480 295.3 480 224C480 135.6 408.4 64 320 64C231.6 64 160 135.6 160 224C160 241.7 174.3 256 192 256C209.7 256 224 241.7 224 224zM320 576C342.1 576 360 558.1 360 536C360 513.9 342.1 496 320 496C297.9 496 280 513.9 280 536C280 558.1 297.9 576 320 576z"
			/></svg
		>
	</a>
</nav>

<style>
	nav {
		display: flex;
		justify-content: end;
		gap: 0.5rem;
		padding: 0.25rem;
	}
	a {
		fill: var(--neutral-200);
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 42px;
		width: 42px;
		text-decoration: none;
		border-radius: var(--radius-md);
		background: transparent;
		transition: all var(--transition);
	}
	svg {
		width: 24px;
		height: 24px;
	}
	a:hover {
		background: var(--neutral-500);
		fill: var(--neutral-100);
	}
	a.selected {
		background: var(--brand-500);
		fill: var(--neutral-700);
	}
	@media only screen and (max-width: 500px) {
		a {
			height: 38px;
			width: 38px;
		}
		svg {
			width: 20px;
			height: 20px;
		}
	}
	@media only screen and (max-width: 400px) {
		a {
			height: 34px;
			width: 34px;
		}
		svg {
			width: 18px;
			height: 18px;
		}
	}
</style>
