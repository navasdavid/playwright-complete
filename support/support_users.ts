
export function getNewUserEmail(): string {
  const newEmail = `${new Date().getTime()}@gcmzdoii.mailosaur.net`;
  return newEmail;
}

export function getExistingUserEmail(options: {
  organization: string;
}): string {
  let existingEmail;
  switch (options.organization) {
    case 'org1':
      existingEmail =
        (process.env['KC360_TEST_USER_EMAIL_ORG1'] as string) || '';
      break;
    default:
      existingEmail =
        (process.env['KC360_TEST_USER_EMAIL_ORG1'] as string) || '';
  }
  return existingEmail;
}


