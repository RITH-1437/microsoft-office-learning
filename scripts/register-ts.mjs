// `node --import ./scripts/register-ts.mjs <script>` — installs the resolver hook.
import { register } from 'node:module'

register('./ts-resolve-hooks.mjs', import.meta.url)
