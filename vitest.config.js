import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['lcov'],
            include: [
                'src/'
            ],
            exclude: [
                'src/main.jsx',
                'src/__tests__/'
            ]
        },
    },
})