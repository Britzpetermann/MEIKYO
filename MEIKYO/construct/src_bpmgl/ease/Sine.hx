package ease;

class Sine
{
    public static function easeIn(t:Float, b:Float,
                                  c:Float, d:Float):Float
    {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }

    public static function easeOut(t:Float, b:Float,
                                   c:Float, d:Float):Float
    {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }

    public static function easeInOut(t:Float, b:Float,
                                     c:Float, d:Float):Float
    {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
}