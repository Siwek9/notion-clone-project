import { ServerResponse } from "./ServerResponse";

export default async function <T>(
    target: string,
    body: BodyInit | null | undefined
): Promise<ServerResponse<T>> {
    const res = await fetch(`http://localhost:8000${target}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    });
    return await res.json();
}
