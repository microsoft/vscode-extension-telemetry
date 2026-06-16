"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryUtil = void 0;
class TelemetryUtil {
    static applyReplacements(data, replacementOptions) {
        for (const key of Object.keys(data)) {
            for (const option of replacementOptions) {
                if (option.lookup.test(key)) {
                    if (option.replacementString !== undefined) {
                        data[key] = option.replacementString;
                    }
                    else {
                        delete data[key];
                    }
                }
            }
        }
    }
    /**
     * Given a key / connection string checks if it is a valid 1DS key
     * @param key The key to check if it's a valid 1DS key
     */
    static shouldUseOneDataSystemSDK(key) {
        // Simple to check to ensure the key is the right length and the dashes are in the right spot
        return (key.length === 74 &&
            key[32] === "-" &&
            key[41] === "-" &&
            key[46] === "-" &&
            key[51] === "-" &&
            key[56] === "-" &&
            key[69] === "-");
    }
    // This also includes the common properties which core mixes in
    // __GDPR__COMMON__ "common.os" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.nodeArch" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.platformversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.extname" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.extversion" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodemachineid" : { "endPoint": "MacAddressHash", "classification": "EndUserPseudonymizedInformation", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodesessionid" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodecommithash" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodeversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.uikind" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.remotename" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.isnewappinstall" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.product" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.telemetryclientversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    static getAdditionalCommonProperties(osShim) {
        return {
            "common.os": osShim.platform,
            "common.nodeArch": osShim.architecture,
            "common.platformversion": (osShim.release || "").replace(/^(\d+)(\.\d+)?(\.\d+)?(.*)/, "$1$2$3"),
            // Do not change this string as it gets found and replaced upon packaging
            "common.telemetryclientversion": "PACKAGE_JSON_VERSION"
        };
    }
    // Get singleton instance of TelemetryUtil
    static getInstance() {
        if (!TelemetryUtil._instance) {
            TelemetryUtil._instance = new TelemetryUtil();
        }
        return TelemetryUtil._instance;
    }
}
exports.TelemetryUtil = TelemetryUtil;
//# sourceMappingURL=util.js.map