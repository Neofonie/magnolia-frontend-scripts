const script = process.argv.length > 1 ? process.argv[2] : undefined;

switch (script) {
    case 'lint':
    case 'format':
    case 'dev':
    case 'build': {
        require(`../scripts/${script}.js`);
        break;
    }
    default: {
        console.error(`Unknwon script "${script}".`);

        process.exit(1);
    }
}
