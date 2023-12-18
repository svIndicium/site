export function isUAMobile() {
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent,
  );
}

export function isMobileSize() {
  return window.matchMedia('screen and (max-width: 768px)').matches;
}
export function getOS() {
  let os = 'unknown';
  let osVersion: string | null = '';
  let nAgt = navigator.userAgent;
  let clientStrings = [
    { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
    { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
    { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
    { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
    { s: 'Windows Vista', r: /Windows NT 6.0/ },
    { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
    { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
    { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
    { s: 'Windows 98', r: /(Windows 98|Win98)/ },
    { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
    { s: 'Android', r: /Android/ },
    { s: 'Chrome OS', r: /CrOS/ },
    { s: 'Linux', r: /(Linux|X11(?!.*CrOS))/ },
    { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
    { s: 'Mac OS X', r: /Mac OS X/ },
    {
      s: 'Mac OS',
      r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
    },
    { s: 'UNIX', r: /UNIX/ },
    {
      s: 'Search Bot',
      r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
    },
  ];
  for (var id in clientStrings) {
    let cs = clientStrings[id];
    if (cs.r.test(nAgt)) {
      os = cs.s;
      break;
    }
  }

  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)![1];
    os = 'Windows';
  }

  switch (os) {
    case 'Mac OS':
    case 'Mac OS X':
    case 'Android':
      osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)![1];
      break;
  }
  return os + ' ' + osVersion;
}

export function getBrowser() {
  let nAgt = navigator.userAgent;
  let browser = 'unknown';
  let minorVersion = '0';
  let nameOffset, verOffset, ix;

  // Opera
  if ((verOffset = nAgt.indexOf('Opera')) != -1) {
    browser = 'Opera';
    minorVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      minorVersion = nAgt.substring(verOffset + 8);
    }
  }
  // Opera Next
  if ((verOffset = nAgt.indexOf('OPR')) != -1) {
    browser = 'Opera';
    minorVersion = nAgt.substring(verOffset + 4);
  }
  // Legacy Edge
  else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
    browser = 'Microsoft Legacy Edge';
    minorVersion = nAgt.substring(verOffset + 5);
  }
  // Edge (Chromium)
  else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
    browser = 'Microsoft Edge';
    minorVersion = nAgt.substring(verOffset + 4);
  }
  // MSIE
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
    browser = 'Microsoft Internet Explorer';
    minorVersion = nAgt.substring(verOffset + 5);
  }
  // Chrome
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
    browser = 'Chrome';
    minorVersion = nAgt.substring(verOffset + 7);
  }
  // Safari
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
    browser = 'Safari';
    minorVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      minorVersion = nAgt.substring(verOffset + 8);
    }
  }
  // Firefox
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
    browser = 'Firefox';
    minorVersion = nAgt.substring(verOffset + 8);
  }
  // MSIE 11+
  else if (nAgt.indexOf('Trident/') != -1) {
    browser = 'Microsoft Internet Explorer';
    minorVersion = nAgt.substring(nAgt.indexOf('rv:') + 3);
  }
  // Other browsers
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
    browser = nAgt.substring(nameOffset, verOffset);
    minorVersion = nAgt.substring(verOffset + 1);
  }
  // trim the version string
  if ((ix = minorVersion.indexOf(';')) != -1) minorVersion = minorVersion.substring(0, ix);
  if ((ix = minorVersion.indexOf(' ')) != -1) minorVersion = minorVersion.substring(0, ix);
  if ((ix = minorVersion.indexOf(')')) != -1) minorVersion = minorVersion.substring(0, ix);
  return {
    browser: browser,
    version: parseInt('' + minorVersion, 10),
    minorVersion: minorVersion,
  };
}

export function hasSessionStorage() {
  return typeof Storage !== 'undefined';
}

export function preloadFullVideoSupported() {
  const link = document.createElement('link');
  link.as = 'video';
  return link.as === 'video';
}
