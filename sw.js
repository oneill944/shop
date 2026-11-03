const C='lista-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','IMG_4302.png'])).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||!/^https?:$/.test(u.protocol)||u.hostname.includes('firebaseio.com')||u.hostname.includes('firebasedatabase.app'))return;
  if(u.origin===location.origin){
    // az app saját fájljai: előbb a hálózat (így a frissítés azonnal megjelenik), net nélkül a mentett példány
    e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{const copy=res.clone();caches.open(C).then(c=>c.put(r,copy));return res}).catch(()=>caches.match(r)));
    return;
  }
  e.respondWith(caches.open(C).then(async c=>{
    const hit=await c.match(r);
    const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(()=>hit);
    e.waitUntil(net);
    return hit||net;
  }));
});
