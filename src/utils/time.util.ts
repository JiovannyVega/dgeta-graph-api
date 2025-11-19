export function parseDurationToSeconds(value: string | undefined, defaultSeconds: number): number {
    if (!value) return defaultSeconds;
    // allow plain number (seconds)
    if (/^\d+$/.test(value)) return Number(value);
    const m = value.match(/^(\d+)([smhd])$/i);
    if (!m) return defaultSeconds;
    const num = parseInt(m[1], 10);
    const unit = m[2].toLowerCase();
    switch (unit) {
        case 's':
            return num;
        case 'm':
            return num * 60;
        case 'h':
            return num * 3600;
        case 'd':
            return num * 86400;
        default:
            return defaultSeconds;
    }
}
