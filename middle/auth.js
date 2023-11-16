
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.use(new GoogleStrategy({
  clientID: "1085817696361-d4uvptk0um2fnavsorfnjalhgq8ae6pr.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
},async (req,accessToken, refreshToken, profile, done) => {
	try {
	
	  done(null, profile);
	} catch (error) {
	  done(error, null);
	}
 }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});