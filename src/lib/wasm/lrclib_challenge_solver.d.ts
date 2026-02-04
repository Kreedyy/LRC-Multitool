/**
 * Solve the proof-of-work challenge by finding a nonce that produces a hash
 * below the target difficulty. This is the WASM-exported function that can be
 * called from JavaScript.
 *
 * # Arguments
 * * `prefix` - The challenge prefix string
 * * `target_hex` - The target difficulty as a hex string
 *
 * # Returns
 * The nonce as a string that solves the challenge
 */
export function solve_challenge(prefix: string, target_hex: string): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
	readonly memory: WebAssembly.Memory;
	readonly solve_challenge: (
		a: number,
		b: number,
		c: number,
		d: number
	) => [number, number, number, number];
	readonly __wbindgen_externrefs: WebAssembly.Table;
	readonly __wbindgen_malloc: (a: number, b: number) => number;
	readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
	readonly __externref_table_dealloc: (a: number) => void;
	readonly __wbindgen_free: (a: number, b: number, c: number) => void;
	readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * @param {{ module: SyncInitInput }} module
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/*
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init(
	module_or_path?:
		| { module_or_path: InitInput | Promise<InitInput> }
		| InitInput
		| Promise<InitInput>
): Promise<InitOutput>;
