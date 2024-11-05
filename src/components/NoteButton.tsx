export function NoteButton({ name, id }: { name: string; id: string }) {
    return (
        <>
            <button
                className="noteBox"
                onClick={() => {
                    console.log(id + " " + name);
                }}
            >
                {name}
            </button>
        </>
    );
}
