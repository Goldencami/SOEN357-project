const attacks = [
    'APAL', 'SIDE', 'ROUNDHOUSE', 'BACK KICK', 'HOOK', 
    'SPIN HOOK', 'AXE', 'CRESCENT', 'TWIST', 'DOUBLE', 
    '360', 'PUNCH', 'CUT', 'CANCEL'
];

function lowerCaseAttack(attack) {
    switch (attack) {
        case 'ROUNDHOUSE':
            return 'roundHouse';
        case 'BACK KICK': 
            return 'backKick';
        case 'SPIN HOOK':
            return 'spinHook';
        default:
            return attack.toLowerCase();
    }
}

export { attacks, lowerCaseAttack };