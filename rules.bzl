"""Macros for generating cros_components test targets."""

load("//javascript/tools/jscompiler/builddefs:flags.bzl", "RECOMMENDED_FLAGS")
load("//tools/build_defs/js:rules.bzl", "js_binary", "js_library")
load("//javascript/typescript:build_defs.bzl", "ts_library")
load("//testing/karma/builddefs:karma_web_test_suite.bzl", "karma_web_test_suite")

def jb_test_library(name, srcs, visibility, deps, use_lit_plugin = False):
    """Creates js/ts_libraries for testing, with and without closure compilation.

    This macro should be a drop-in replacement for `ts_library`.
    """

    ts_library(
        name = name,
        testonly = True,
        srcs = srcs,
        visibility = visibility,
        deps = deps,
        use_lit_plugin = use_lit_plugin,
    )

    js_binary(
        name = name + "_bin_es5",
        testonly = True,
        defs = RECOMMENDED_FLAGS + [
            "--language_out=ES5",
        ],
        visibility = visibility,
        deps = [":" + name],
    )

    js_library(
        name = name + "_es5",
        testonly = True,
        srcs = [":" + name + "_bin_es5.js"],
        check_level = "OFF",
        visibility = visibility,
    )

def jb_karma_web_test_suite(
        name,
        deps,
        data,
        karma_plugins = ["//testing/karma/karma_scuba_framework:karma_scuba"],
        unmanaged_deps = ["//third_party/javascript/polymer/v2/webcomponentsjs:webcomponents-lite"],
        browsers = ["//testing/web/browsers:chrome-linux"],
        configs = []):
    """Creates mutliple test targets, targeting typescript or closure libraries.

    This macro should offer a similar API `karma_web_test_suite`, plus some defaults favoured by
    cros_components.
    TODO(b/285786627): Scuba tests don't pass closure compliance because something somewhere invokes
    `eval`.

    Parameters:
      name (string): The name (prefix) for the generated test targets.
      deps (string[]): The test suites. They should have been generated with `jb_test_library`.
      data (string[]): Data to be forwarded to `karma_web_test_suite`.

    """

    karma_web_test_suite(
        name,
        browsers = browsers,
        data = data,
        karma_plugins = karma_plugins,
        unmanaged_deps = unmanaged_deps,
        deps = deps,
        configs = configs,
    )

    karma_web_test_suite(
        name = name + "_closure",
        browsers = browsers,
        data = data,
        karma_plugins = karma_plugins,
        transpile = "always",
        unmanaged_deps = unmanaged_deps,
        deps = [(dep + "_es5") for dep in deps],
        configs = configs,
    )
