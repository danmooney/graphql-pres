/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types

let users = {
    1: {
        id: 1,
        firstName: 'Dan',
        lastName: 'Mooney',
	    interests: [
		    'reading',
		    'eating'
	    ]
    },
    2: {
        id: 2,
        firstName: 'Adam',
        lastName: 'Chambers',
        interests: [
	        'drinking',
            'typing'
        ]
    },
    3: {
        id: 3,
        firstName: 'Adam',
        lastName: 'Soffer',
        interests: [
            'legos',
            'swimming'
        ]
    },
	4: {
		id: 4,
		firstName: 'Justin',
		lastName: 'Cook',
		interests: [
			'driving',
			'cooking'
		]
	}
};

export {
    users
};