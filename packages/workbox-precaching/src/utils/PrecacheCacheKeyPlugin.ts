/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {WorkboxPlugin, WorkboxPluginCallbackParam} from 'workbox-core/types.js';

import {PrecacheController} from '../PrecacheController.js';

import '../_version.js';


class PrecacheCacheKeyPlugin implements WorkboxPlugin {
  private readonly _precacheController: PrecacheController;

  constructor({precacheController}: {precacheController: PrecacheController}) {
    this._precacheController = precacheController;
  }

  cacheKeyWillBeUsed: WorkboxPlugin['cacheKeyWillBeUsed'] = async ({
    request,
    params,
  }: WorkboxPluginCallbackParam['cacheKeyWillBeUsed']) => {
    const cacheKey = params && params.cacheKey ||
        this._precacheController.getCacheKeyForURL(request.url);

    return cacheKey ? new Request(cacheKey) : request;
  }
}

export {PrecacheCacheKeyPlugin};
