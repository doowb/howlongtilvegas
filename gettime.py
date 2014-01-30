from google.appengine.api import xmpp
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from datetime import date
from datetime import time
from datetime import datetime
from datetime import timedelta

class XMPPHandler(webapp.RequestHandler):
    def post(self):
        message = xmpp.Message(self.request.POST)
        msg = ""
        if message.body[0:5].lower() == 'time':
            d = date(2014, 3, 20)
            t = time(0, 50)
            dt = datetime.combine(d, t)
            timeleft = dt - datetime.now()
            msg = str(timeleft)
        else:
            msg = "w00t wahooo!!!"

        message.reply(msg)

application = webapp.WSGIApplication([('/_ah/xmpp/message/chat/', XMPPHandler)], debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
