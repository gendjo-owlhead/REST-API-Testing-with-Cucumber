module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['src/features/step_definitions/*.ts', 'src/support/*.ts'],
        paths: ['src/features/*.feature']
    }
};