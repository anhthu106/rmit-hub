export default function Button({fn, options}) {
    return (
        <div>
            <button
                onClick={fn}>{options}
            </button>
        </div>
    )
}