import { getUserDetails } from '../GraphService';

export function normalizeError(error) {
    var normalizedError = {};
    if (typeof (error) === 'string') {
        var errParts = error.split('|');
        normalizedError = errParts.length > 1 ?
            { message: errParts[1], debug: errParts[0] } :
            { message: error };
    } else {
        normalizedError = {
            message: error.message,
            debug: JSON.stringify(error)
        };
    }
    return normalizedError;
}

export async function getUserProfile(userAgentApplication, scopes) {
    try {
        var accessToken = await getAccessToken(userAgentApplication, scopes);

        if (accessToken) {
            return await getUserDetails(accessToken);
        }
        return null;
    }
    catch (err) {
        throw err;
    }
}

async function getAccessToken(userAgentApplication, scopes) {
    try {
        var silentResult = await userAgentApplication
            .acquireTokenSilent({
                scopes: scopes
            });

        return silentResult.accessToken;
    } catch (err) {
        if (isInteractionRequired(err)) {
            var interactiveResult = await userAgentApplication
                .acquireTokenPopup({
                    scopes: scopes
                });
                console.log(interactiveResult)
            return interactiveResult.accessToken;
        } else {
            console.log(err)
            throw err;
        }
    }
}

function isInteractionRequired(error) {
    console.log(error.message);
    if (!error.message || error.message.length <= 0) {
        return false;
    }

    return (
        error.message.indexOf('The idToken is null or empty. Please review the trace to determine the root cause. Raw ID Token Value: null') > -1 ||
        error.message.indexOf('Token renewal operation failed due to timeout.') > -1 ||
        error.message.indexOf('Session information is not sufficient for single-sign-on.') > -1 ||
        error.message.indexOf('consent_required') > -1 ||
        error.message.indexOf('interaction_required') > -1 ||
        error.message.indexOf('login_required') > -1 ||
        error.message.indexOf('no_account_in_silent_request') > -1
    );
}