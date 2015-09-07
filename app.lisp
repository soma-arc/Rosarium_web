(ql:quickload :rosarium_web)

(defpackage rosarium_web.app
  (:use :cl)
  (:import-from :lack.builder
                :builder)
  (:import-from :cl-fad
                :list-directory)
  (:import-from :ppcre
                :scan
                :regex-replace
                :regex-replace-all)
  (:import-from :rosarium_web.web
                :*web*)
  (:import-from :rosarium_web.config
                :config
                :productionp
                :*static-directory*))
(in-package :rosarium_web.app)

(builder
 (:static
  :path (lambda (path)
          (if (ppcre:scan "^(?:/icon/|/images/|/contents/|/css/|/js/|/robot\\.txt$|/favicon.ico$)" path)
              path
              nil))
  :root *static-directory*)
 (if (productionp)
     nil
     :accesslog)
 (if (getf (config) :error-log)
     '(:backtrace
       :output (getf (config) :error-log))
     nil)
 :session
 (if (productionp)
     nil
     (lambda (app)
       (lambda (env)
         (let ((datafly:*trace-sql* t))
           (funcall app env)))))
 *web*)
