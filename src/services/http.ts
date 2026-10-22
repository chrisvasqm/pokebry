import ky from "ky";

/** Shared defaults for every HTTP client in the app. */
const http = ky.create({
    // Same as axios before: no client-side time limit; slow mobile connections still finish.
    timeout: false,
    // TanStack Query already retries failed queries; retrying here too would multiply the attempts.
    retry: 0
});

export default http;
