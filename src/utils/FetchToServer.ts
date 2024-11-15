import { ServerResponse } from "./ServerResponse";

export default async function <T>(
    target: string,
    body: BodyInit | null | undefined
): Promise<ServerResponse<T>> {
    const address = window.location.origin.replace(":5173", ":8000");
    const res = await fetch(`${address}${target}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    });
    return await res.json();
}
