import continueWithSocialAuth from './continue-with-social-auth';

export const continueWithGoogle = () =>
	continueWithSocialAuth('google-oauth2', 'google');
export const continueWithYandex = () =>
	continueWithSocialAuth('yandex-oauth2', 'yandex');