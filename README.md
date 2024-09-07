# http-forward-play

This project builds a forward proxy server based on the [Coding Challenge 51 - HTTP Forward](https://codingchallenges.substack.com/p/coding-challenge-51-http-forward).  The server is built using the core modules in Node v20.15.0.  This currently supports the first 3 steps.

Thanks to [John Crickett](https://substack.com/@johncrickett) for creating [Coding Challenges on Substack](https://codingchallenges.substack.com)!.


### How to start the project

```
git clone https://github.com/marvinsjsu/http-forward-play.git
cd http-forward-play
npm install
```

#### To run for development
```
npm run watch
```

#### To test the proxy using `curl`

This should successfully send a request via the proxy
```
curl --proxy "http://localhost:8989" "http://httpbin.org/ip"
```

This should return a 403 response for forbidden domain.  The list of forbidden domains are in [/data/forbidden-hosts.txt](/data/forbidden-hosts.txt)
```
curl --proxy "http://localhost:8989" -v "http://instagram.com/"
```

This should return a 403 response for banned content.  The list of banned words are in [/data/banned-words.txt](/data/banned-words.txt)
```
curl --proxy "http://localhost:8989" -v "http://dummyjson.com/" 
```

