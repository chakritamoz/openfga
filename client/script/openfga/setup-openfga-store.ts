import "dotenv/config";

import {
    ClientWriteRequestOnDuplicateWrites,
    OpenFgaClient,
} from '@openfga/sdk';

async function main() {
    const openFga = new OpenFgaClient({
        apiUrl: process.env.FGA_API_URL,
    });

    const { id: storeId } = await openFga.createStore({
        name: "FGA Demo Store",
    });

    const storeClient = new OpenFgaClient({
        apiUrl: process.env.FGA_API_URL,
        storeId,
    });

    console.log(`FGA_STORE_ID=${storeId}`);

    const { authorization_model_id: modelId } = await storeClient.writeAuthorizationModel({
        "schema_version": "1.1",
        "type_definitions": [
            {
                "type": "user",
                "relations": {},
                "metadata": undefined
            },
            {
                "type": "group",
                "relations": {
                    "member": {
                        "this": {}
                    }
                },
                "metadata": {
                    "relations": {
                        "member": {
                            "directly_related_user_types": [
                                {
                                    "type": "user"
                                }
                            ]
                        }
                    }
                }
            },
            {
                "type": "role",
                "relations": {
                    "member": {
                        "this": {}
                    }
                },
                "metadata": {
                    "relations": {
                        "member": {
                            "directly_related_user_types": [
                                {
                                    "type": "user"
                                },
                                {
                                    "type": "group",
                                    "relation": "member"
                                }
                            ]
                        }
                    }
                }
            },
            {
                "type": "realm",
                "relations": {
                    "can-create-org": {
                        "this": {}
                    },
                    "can-delete-org": {
                        "this": {}
                    },
                    "can-view-org": {
                        "this": {}
                    },
                    "can-edit-org": {
                        "this": {}
                    },
                    "can-create-asset": {
                        "this": {}
                    },
                    "can-delete-asset": {
                        "this": {}
                    },
                    "can-view-asset": {
                        "this": {}
                    },
                    "can-edit-asset": {
                        "this": {}
                    }
                },
                "metadata": {
                    "relations": {
                        "can-create-org": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-delete-org": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-view-org": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-edit-org": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-create-asset": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-delete-asset": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-view-asset": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-edit-asset": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        }
                    }
                }
            },
            {
                "type": "organization",
                "relations": {
                    "parent": {
                        "this": {}
                    },
                    "can-view-org": {
                        "union": {
                            "child": [
                                {
                                    "this": {}
                                },
                                {
                                    "tupleToUserset": {
                                        "computedUserset": {
                                            "relation": "can-view-org"
                                        },
                                        "tupleset": {
                                            "relation": "parent"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "can-edit-org": {
                        "union": {
                            "child": [
                                {
                                    "this": {}
                                },
                                {
                                    "tupleToUserset": {
                                        "computedUserset": {
                                            "relation": "can-edit-org"
                                        },
                                        "tupleset": {
                                            "relation": "parent"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "can-create-asset": {
                        "union": {
                            "child": [
                                {
                                    "this": {}
                                },
                                {
                                    "tupleToUserset": {
                                        "computedUserset": {
                                            "relation": "can-create-asset"
                                        },
                                        "tupleset": {
                                            "relation": "parent"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "can-delete-asset": {
                        "union": {
                            "child": [
                                {
                                    "this": {}
                                },
                                {
                                    "tupleToUserset": {
                                        "computedUserset": {
                                            "relation": "can-delete-asset"
                                        },
                                        "tupleset": {
                                            "relation": "parent"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "can-view-asset": {
                        "union": {
                            "child": [
                                {
                                    "this": {}
                                },
                                {
                                    "tupleToUserset": {
                                        "computedUserset": {
                                            "relation": "can-view-asset"
                                        },
                                        "tupleset": {
                                            "relation": "parent"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "can-edit-asset": {
                        "union": {
                            "child": [
                                {
                                    "this": {}
                                },
                                {
                                    "tupleToUserset": {
                                        "computedUserset": {
                                            "relation": "can-edit-asset"
                                        },
                                        "tupleset": {
                                            "relation": "parent"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                "metadata": {
                    "relations": {
                        "parent": {
                            "directly_related_user_types": [
                                {
                                    "type": "realm"
                                }
                            ]
                        },
                        "can-view-org": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-edit-org": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-create-asset": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-delete-asset": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-view-asset": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-edit-asset": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        }
                    }
                }
            },
            {
                "type": "asset",
                "relations": {
                    "owner": {
                        "this": {}
                    },
                    "parent": {
                        "this": {}
                    },
                    "can-view-asset": {
                        "union": {
                            "child": [
                                {
                                    "this": {}
                                },
                                {
                                    "computedUserset": {
                                        "relation": "owner"
                                    }
                                },
                                {
                                    "tupleToUserset": {
                                        "computedUserset": {
                                            "relation": "can-view-asset"
                                        },
                                        "tupleset": {
                                            "relation": "parent"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "can-edit-asset": {
                        "union": {
                            "child": [
                                {
                                    "this": {}
                                },
                                {
                                    "computedUserset": {
                                        "relation": "owner"
                                    }
                                },
                                {
                                    "tupleToUserset": {
                                        "computedUserset": {
                                            "relation": "can-edit-asset"
                                        },
                                        "tupleset": {
                                            "relation": "parent"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "can-delete-asset": {
                        "union": {
                            "child": [
                                {
                                    "computedUserset": {
                                        "relation": "owner"
                                    }
                                },
                                {
                                    "tupleToUserset": {
                                        "computedUserset": {
                                            "relation": "can-delete-asset"
                                        },
                                        "tupleset": {
                                            "relation": "parent"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                "metadata": {
                    "relations": {
                        "owner": {
                            "directly_related_user_types": [
                                {
                                    "type": "user"
                                }
                            ]
                        },
                        "parent": {
                            "directly_related_user_types": [
                                {
                                    "type": "organization"
                                }
                            ]
                        },
                        "can-view-asset": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-edit-asset": {
                            "directly_related_user_types": [
                                {
                                    "type": "role",
                                    "relation": "member"
                                }
                            ]
                        },
                        "can-delete-asset": {
                            "directly_related_user_types": []
                        }
                    }
                }
            }
        ]
    });

    console.log(`FGA_MODEL_ID=${modelId}`);

    await storeClient.writeTuples(
        [
            {
                user: "user:demo",
                relation: "member",
                object: "group:demo",
            },
        ],
        {
            authorizationModelId: modelId,
            conflict: {
                onDuplicateWrites: ClientWriteRequestOnDuplicateWrites.Ignore,
            },
        },
    );

    console.log(`Write tuple: user:demo#member@group:demo`);

    const { allowed } = await storeClient.check(
        {
            user: "user:demo",
            relation: "member",
            object: "group:demo",
        },
        { authorizationModelId: modelId },
    );

    console.log(`Tuple check=${allowed}`);

    await storeClient.deleteTuples(
        [
            {
                user: "user:demo",
                relation: "member",
                object: "group:demo",
            },
        ],
        {
            authorizationModelId: modelId,
        }
    );

    console.log(`Delete tuple: user:demo#member@group:demo`);

    await storeClient.check(
        {
            user: "user:demo",
            relation: "member",
            object: "group:demo",
        },
        { authorizationModelId: modelId },
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
