(in-package :cl-user)
(defpackage rosarium_web-asd
  (:use :cl :asdf))
(in-package :rosarium_web-asd)

(defsystem rosarium_web
  :version "0.1"
  :author "soma_arc"
  :license ""
  :depends-on (:clack
               :lack
               :caveman2
               :envy
               :cl-ppcre
               :cl-fad
               :parenscript

               ;; for @route annotation
               :cl-syntax-annot

               ;; HTML Template
               :djula

               ;; for DB
               :datafly
               :sxql)
  :components ((:module "src"
                :components
                ((:file "main" :depends-on ("config" "view" "db"))
                 (:file "web" :depends-on ("view"))
                 (:file "view" :depends-on ("config"))
                 (:file "db" :depends-on ("config"))
                 (:file "psutil")
                 (:file "ps/common/complex" :depends-on ("psutil" "config"))
                 (:file "js-builder" :depends-on ("config"
                                                  "ps/common/complex"))
                 (:file "config"))))
  :description ""
  :in-order-to ((test-op (load-op rosarium_web-test))))
